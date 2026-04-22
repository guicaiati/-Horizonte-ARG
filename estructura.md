# 🎮 Cómo desarrollar el juego (guía práctica)

## 🧱 FASE 1 — Definición (antes de programar)

### 🎯 Idea concreta

Juego 2D vista top-down donde un gaucho explora, combate y usa recursos del entorno (hierbas/mate) para sobrevivir mientras avanza hacia su venganza.

---

### 🔁 Core Loop (lo que el jugador hace siempre)

Explorar → encontrar enemigos → combatir → recolectar hierbas → preparar mate → acampar → repetir

---

### ⚙️ Alcance (scope realista)

Para un primer prototipo:

* 1 personaje jugable
* 1 mapa chico
* 2–3 enemigos
* 1 sistema diferencial: uso de hierbas + mate

---

## 🛠️ FASE 2 — Herramientas

### 🧩 Motor de juego

* **Unity (recomendado)**

  * Lenguaje: **C#**
  * Ventajas: comunidad grande, muchos tutoriales, ideal 2D

* Alternativa:

  * **Godot**
  * Lenguaje: GDScript (más simple)

---

### 🎨 Arte

* Estilo: **Pixel Art simple**
* Herramientas:

  * Aseprite (ideal)
  * Photoshop (si ya lo usás)

---

### 🔊 Audio

* Sonidos básicos:

  * pasos
  * disparos
  * ambiente campo
* Música: folklore / ambiente

---

## 🧪 FASE 3 — Prototipo (lo más importante)

⚠️ Objetivo: que sea jugable, no lindo

### 🔹 1. Movimiento

* 4 direcciones (arriba, abajo, izquierda, derecha)
* Input teclado

---

### 🔹 2. Ataque

* Botón → golpe (melee)
* Daño simple

---

### 🔹 3. Enemigo básico

* Se mueve o persigue
* Tiene vida
* Muere

---

### 🔹 4. Sistema de vida

* Barra de vida jugador
* Daño recibido

---

### 🔹 5. Recolección

* Objetos en el piso (hierbas)
* Inventario simple

---

### 🔹 6. Mate (mecánica diferencial)

* Botón para consumir
* Efecto simple:

  * curación
  * o buff temporal

---

👉 Si esto funciona = TENÉS JUEGO BASE

---

## 🧩 FASE 4 — Vertical Slice

Mini juego completo:

* 1 mapa terminado
* 2 tipos de enemigos
* UI básica (vida + inventario)
* sistema de mate funcional
* inicio y final

---

## ⚙️ Pautas de funcionamiento

### 🎮 Controles básicos

* WASD → movimiento
* Click / tecla → atacar
* Tecla → usar mate
* Tecla → interactuar

---

### 🧠 Lógica del juego

#### Jugador

* Tiene vida
* Puede atacar
* puede recolectar
* puede usar recursos

---

#### Enemigos

* Detectan jugador
* Persiguen
* Atacan
* Mueren

---

#### Sistema de ítems

* Spawn en mapa
* Recolección
* Uso con efecto

---

#### Campamento

* Punto seguro
* Recuperación de vida
* pausa del juego

---

## 🧱 Estructura básica del proyecto (Unity)

```
/Assets
  /Scripts
    PlayerController.cs
    EnemyController.cs
    GameManager.cs
  /Prefabs
    Player
    Enemy
    Item
  /Scenes
    Level_01
```

---

## 🚀 FASE 5 — Publicación

### 🧾 Steam

* Crear cuenta Steamworks (~100 USD)
* Subir build
* Cargar imágenes

---

### 📢 Difusión

* Devlogs (Twitter/X, Reddit)
* Videos cortos
* Progreso semanal

---

## ⚠️ Errores a evitar

* ❌ Querer hacer mundo abierto
* ❌ Empezar por gráficos
* ❌ Agregar demasiadas mecánicas
* ❌ No testear jugabilidad

---

## 💡 Plan realista (3 semanas)

### Semana 1

* Movimiento
* Ataque
* Enemigo

### Semana 2

* Sistema de vida
* Recolección
* Mate

### Semana 3

* Nivel completo
* UI básica
* Testeo

---

## 🎯 Objetivo final

Tener un **prototipo jugable simple pero funcional** que permita:

* probar si es divertido
* mostrarlo
* mejorarlo

---

👉 Regla clave:
**Primero jugable, después lindo.**
