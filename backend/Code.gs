// Sinila store backend. Paste into Extensions > Apps Script of the Google Sheet.
// Run setup() once. Then Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.

var PRICES = { 'one': 349, 'two': 599 };  // keep in sync with src/config.js packs
var PREPAID_DISCOUNT = 50;
var SHEETS = {
  Orders: ['Order ID','Created','Name','Phone','House/Building','Road/Area/Colony','Pin code','City','State','Landmark','Pack','Payment','Total','Status','Courier','Tracking no','Tracking link','Last updated'],
  Returns: ['Request ID','Created','Name','Phone','Order phone','Problem','UPI ID','Message','Status','Courier','Tracking no','Last updated']
};

function setup() {
  var ss = SpreadsheetApp.getActive();
  Object.keys(SHEETS).forEach(function (name) {
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);
    sh.getRange(1, 1, 1, SHEETS[name].length).setValues([SHEETS[name]]).setFontWeight('bold');
    sh.setFrozenRows(1);
  });
  var first = ss.getSheetByName('Sheet1');
  if (first && ss.getSheets().length > 1) ss.deleteSheet(first);
}

function clean(v, max) { return String(v == null ? '' : v).trim().slice(0, max || 200); }
function digits(v) { return String(v || '').replace(/\D/g, ''); }

function doPost(e) {
  var out = { ok: false, message: '' };
  try {
    var d = JSON.parse(e.postData.contents || '{}');
    if (d.website) return json({ ok: true });            // honeypot: bots fill this hidden field
    var ss = SpreadsheetApp.getActive();
    if (d.type === 'order') {
      var pack = d.pack === 'two' ? 'two' : 'one';
      var pay = d.payment === 'cod' ? 'Cash on delivery' : 'Pay online';
      var total = PRICES[pack] - (d.payment === 'cod' ? 0 : PREPAID_DISCOUNT);  // server price, never trust the page
      var id = 'SN' + String(Date.now()).slice(-6);
      var phone = digits(d.phone);
      if (!/^[6-9]\d{9}$/.test(phone) || clean(d.name).length < 2 || clean(d.pin).length !== 6) return json({ ok: false, message: 'Please check the details.' });
      ss.getSheetByName('Orders').appendRow([id, new Date(), clean(d.name, 80), phone, clean(d.house, 120), clean(d.road, 160), digits(d.pin), clean(d.city, 80), clean(d.state, 80), clean(d.landmark, 120), pack === 'two' ? '2 bottles' : '1 bottle', pay, total, 'Confirmed', '', '', '', new Date()]);
      return json({ ok: true, id: id, total: total });
    }
    if (d.type === 'return') {
      var rid = 'RT' + String(Date.now()).slice(-6);
      var ph = digits(d.phone);
      if (!/^[6-9]\d{9}$/.test(ph) || clean(d.name).length < 2) return json({ ok: false, message: 'Please check the details.' });
      ss.getSheetByName('Returns').appendRow([rid, new Date(), clean(d.name, 80), ph, digits(d.orderPhone), clean(d.problem, 40), clean(d.upi, 60), clean(d.message, 500), 'New', '', '', new Date()]);
      return json({ ok: true, id: rid });
    }
    return json({ ok: false, message: 'Unknown request.' });
  } catch (err) {
    return json({ ok: false, message: 'Something went wrong. Please try again.' });
  }
}

// Tracking lookup: ?action=track&kind=order|return&id=...&phone=...
function doGet(e) {
  var p = e.parameter || {};
  if (p.action !== 'track') return json({ ok: false, message: 'Unknown request.' });
  var name = p.kind === 'return' ? 'Returns' : 'Orders';
  var idCol = p.kind === 'return' ? 0 : 0;
  var phoneCol = p.kind === 'return' ? 3 : 3;
  var rows = SpreadsheetApp.getActive().getSheetByName(name).getDataRange().getValues();
  var want = clean(p.id, 20).toUpperCase(), ph = digits(p.phone);
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][idCol]).toUpperCase() === want && String(rows[i][phoneCol]) === ph) {
      var r = rows[i];
      if (p.kind === 'return') return json({ ok: true, kind: 'return', status: r[8], courier: r[9], trackingNo: r[10], updated: r[11] });
      return json({ ok: true, kind: 'order', status: r[13], courier: r[14], trackingNo: r[15], trackingLink: r[16], updated: r[17] });
    }
  }
  return json({ ok: false, message: 'We could not find that. Check the number and phone.' });
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
