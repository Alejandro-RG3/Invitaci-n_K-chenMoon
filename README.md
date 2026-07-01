# Invitación digital Küchen Moon

Web estática para la inauguración de Küchen Moon, preparada para GitHub Pages y optimizada para móvil.

## Probar localmente

Abre `index.html` directamente en el navegador. También puedes servir la carpeta con cualquier servidor estático si quieres simular mejor GitHub Pages.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube `index.html`, `styles.css`, `script.js`, `README.md` y la carpeta `assets`.
3. En GitHub, ve a `Settings` -> `Pages`.
4. En `Build and deployment`, elige la rama donde subiste los archivos y la carpeta raíz.
5. Guarda y espera a que GitHub genere la URL pública.

## Configurar Google Forms

1. Crea un formulario en Google Forms para confirmar asistencia.
2. Pulsa `Enviar`.
3. Elige el icono de enlace.
4. Copia la URL del formulario.
5. En `script.js`, pega esa URL en esta constante:

```js
const GOOGLE_FORM_URL = "";
```

Ejemplo:

```js
const GOOGLE_FORM_URL = "https://forms.gle/tu-enlace";
```

Si está vacío, los botones de confirmación no fallan: muestran un aviso elegante indicando que falta configurar el enlace.

## Hacer que suene la música

La web está preparada para reproducir:

```text
assets/welcome-to-the-jungle.mp3
```

No se incluye ningún archivo de audio. Añádelo solo si tienes permiso o licencia para usarlo. El nombre y la ubicación deben coincidir exactamente:

```text
assets/welcome-to-the-jungle.mp3
```

El sonido empieza al pulsar el único botón principal `Ver invitación`. Los navegadores modernos no permiten reproducir audio con sonido sin una acción del usuario; por eso ese botón hace dos cosas a la vez: intenta iniciar la música y baja a la invitación.

Si el archivo no existe, el botón sigue funcionando y muestra `Música no disponible`.

## Cambiar la fecha

En `script.js`, edita:

```js
const EVENT_DATE = new Date("2026-07-10T21:00:00+02:00");
```

Para España peninsular en julio se usa `+02:00`. Si cambias el evento a invierno, normalmente será `+01:00`.

## Imagen para WhatsApp y redes

El HTML referencia este placeholder:

```text
assets/og-kuchen-moon.jpg
```

Añade ahí una imagen horizontal, idealmente de `1200x630 px`. Para máxima compatibilidad con WhatsApp y otras plataformas, cuando ya tengas la URL final puedes convertir el valor de `og:image` en `index.html` a una URL absoluta.

## Imágenes incluidas

La galería del showroom usa:

```text
assets/showroom-01.png
assets/showroom-02.png
assets/showroom-03.png
```

El fondo principal usa:

```text
assets/hero-kuchen-moon.png
```
