from fastapi import FastAPI
from datetime import datetime  # <--- Importamos esto

app = FastAPI()

@app.get("/")
def inicio():
    return {"mensaje": "Aprendiendo fastapi"}

@app.get("/saludo/{nombre}")
def saludo(nombre: str):
    return {"mensaje": f"Mi nombre es: {nombre}"}

# --- Nuevo ejercicio: Ruta para mostrar la hora ---
@app.get("/hora")
def obtener_hora():
    # Obtenemos la hora actual y la formateamos
    hora_actual = datetime.now().strftime("%H:%M:%S")
    fecha_actual = datetime.now().strftime("%Y-%m-%d")
    
    return {
        "mensaje": "Consulta de hora exitosa",
        "hora": hora_actual,
        "fecha": fecha_actual
    }