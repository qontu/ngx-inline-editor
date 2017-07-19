---
title: Desarrolladores
type: page
weight: 650
---
Este componente no usa dependencias de terceros por lo que es ultra ligero {{<emoticon name="wink" >}}


Como herramienta para automatizar procesos usamos `gulp` y para crear los bundles `rollup`.

Si quieres colaborar en el desarrollo te indicaré los pasos que usamos:

1. Para compilar el código 
    `npm run build`
    - Esto creará una carpeta `dist/` con el código transpilado y bundleado.


2. Para iniciar el modo debug:
    `npm run debug`
     - Esto copiará los ficheros `src/**/*.ts` al directorio `dist/` y permitirá que puedas usar directamente los ficheros typescript, esto aporta una gran facilidad a la hora de debuggear, ya que no necesitas los `.map`.
     - Una vez iniciado, ejecuta el comando `yarn link`
     - Y luego en tu proyecto de prueba `yarn link @qontu/ngx-inline-editor`
