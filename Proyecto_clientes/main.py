from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def inicio ():
    return {"mensaje": "Aprendiendo fastapi" }

# aplicación clientes
lista_clientes = []

# model - modelos
class Cliente(BaseModel):
    id: int
    nombre : str
    edad : int
    descripcion : str | None = None

# 1. Obtener todos los clientes
@app.get("/clientes")
def listar_clientes():
    return {"Clientes": lista_clientes}

# 2. Crear un nuevo cliente
@app.post("/clientes")
def crear_clientes(datos_cliente: Cliente):
    lista_clientes.append(datos_cliente)
    return {"mensaje": "Cliente creado"}

# --- RETO: Endpoint para retornar un solo cliente ---
@app.get("/clientes/{cliente_id}")
def obtener_cliente(cliente_id: int):
    # Buscamos en la lista el cliente que tenga el mismo ID que pedimos
    for cliente in lista_clientes:
        if cliente.id == cliente_id:
            return {"Cliente encontrado": cliente}
    
    # Si el bucle termina y no encontró nada:
    return {"error": "No se encontró un cliente con ese ID"}