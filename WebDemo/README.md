# Horizonte: Gaucho Revancha - Web Demo & Tools

Este directorio contiene la demo técnica web y las herramientas de edición para el motor de juego **Horizonte**.

## 📁 Contenido del Directorio

### 1. 🎮 Demo del Juego (`index.html`)
Una implementación preliminar del motor de juego Horizonte ejecutándose en el navegador.
- **Tecnologías**: HTML5 Canvas, JavaScript Vanilla.
- **Características**: Sistema de renderizado de sprites, gestión de salud y recursos (Mate).

### 2. 🎨 Pixel Art Editor (`pixelart.html`)
Herramienta profesional diseñada específicamente para la creación de assets para Horizonte.
- **Ubicación**: [pixelart.html](pixelart.html)
- **Funcionalidades Clave**:
    - **Sistema de Capas de Animación**: Permite marcar componentes específicos (Espada, Brazos, Cabeza) usando máscaras numéricas para su posterior exportación técnica.
    - **Biblioteca de Assets**: Acceso a plantillas oficiales (Martín, Don Mateo, Soldado) y persistencia local para tus propias creaciones.
    - **Herramientas de Transformación**: Espejado horizontal, vertical y diagonal; corrección de paleta de colores del juego.
    - **Importación/Exportación**: Soporte para subir imágenes externas, recortarlas y exportar el resultado en formato JSON técnico compatible con el motor.

## 🚀 Cómo Empezar

Simplemente abre los archivos `.html` en cualquier navegador moderno.

### Instrucciones del Editor de Pixel Art:
1.  **Dibujo**: Usa el lápiz (P) o el bote de pintura (G). Mantén presionado `Ctrl` para usar el cuentagotas.
2.  **Capas**: Selecciona el icono de la máscara (M) para asignar píxeles a capas de animación específicas. Esto es vital para que el motor reconozca las partes móviles del personaje.
3.  **Guardado**: Tus progresos se guardan en el `localStorage` del navegador bajo "Mis Creaciones".
4.  **Exportación**: Usa "Exportar JSON" para generar el archivo `asset.json` que utiliza el motor de juego para parsear los componentes.

---
*Desarrollado para el proyecto Horizonte: Gaucho Revancha.*
