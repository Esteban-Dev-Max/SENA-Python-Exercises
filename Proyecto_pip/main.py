from fastapi import FastAPI
from datetime import datetime
import zoneinfo

app = FastAPI()

# Diccionario de ciudades corregido
ciudades = {
    "AR": "America/Argentina/Buenos_Aires",
    "GT": "America/Guatemala",
    "MX": "America/Mexico_City",
    "CO": "America/Bogota",
    "ES": "Europe/Madrid",
    "CL": "America/Santiago"
}

# 1. El saludo del principio (Ruta raíz)
@app.get("/")
def inicio():
    return {"mensaje": "Aprendiendo fastapi"}

# 2. El saludo con nombre
@app.get("/saludo/{nombre}")
def saludo(nombre: str):
    return {"mensaje": f"Mi nombre es: {nombre}"}

# 3. El ejercicio de la hora por país
@app.get("/hora/{iso_code}")
def hora(iso_code: str):
    clave = iso_code.upper()
    zona_ciudad = ciudades.get(clave)
    
    if not zona_ciudad:
        return {"error": f"El código '{clave}' no es válido. Usa: AR, GT, MX, CO, ES o CL."}

    tiempo_zona = zoneinfo.ZoneInfo(zona_ciudad)
    resultado_hora = datetime.now(tiempo_zona)
    
    return {
        "País": clave,
        "Hora": resultado_hora.strftime("%H:%M:%S"),
        "Fecha": resultado_hora.strftime("%Y-%m-%d")
    }