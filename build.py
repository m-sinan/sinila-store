import re,shutil,os
os.makedirs('dist',exist_ok=True);os.makedirs('preview',exist_ok=True)
cfg=open('src/config.js').read()
shutil.copy('src/config.js','dist/config.js')
shutil.copytree('src/img','dist/img',dirs_exist_ok=True) if os.path.isdir('src/img') else None
head='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
for src,dst in [('home.html','index.html'),('product.html','product.html'),('order.html','order.html'),('policies.html','policies.html'),('track.html','track.html')]:
    h=open('src/'+src).read()
    m=re.search(r'<title>.*?</title>',h,re.S)
    t=m.group(0) if m else '<title>Policies</title>'
    body=h.replace(t,'')
    open('dist/'+dst,'w').write(head+t+'</head><body>'+body+'</body></html>')
    pv=h.replace('<script src="config.js"></script>','<script>'+cfg+'</script>')
    open('preview/'+src,'w').write(pv)
