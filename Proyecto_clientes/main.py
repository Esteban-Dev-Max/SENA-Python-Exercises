from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from modelos.factura import FacturaCreate, FacturaDB, FacturaUpdate
from modelos.transaccion import TransaccionCreate, TransaccionDB, TransaccionUpdate

app = FastAPI()


class Cliente(BaseModel):
    nombre: str
    edad: int
    descripcion: str | None = None


lista_clientes: list[dict] = []
lista_facturas: list[FacturaDB] = []
lista_transacciones: list[TransaccionDB] = []

id_cliente_inc = 1
id_factura_inc = 1
id_transaccion_inc = 1


def obtener_indice_factura(factura_id: int) -> int:
    for i, factura in enumerate(lista_facturas):
        if factura.id == factura_id:
            return i
    raise HTTPException(status_code=404, detail="Factura no encontrada")


def obtener_indice_transaccion(transaccion_id: int) -> int:
    for i, transaccion in enumerate(lista_transacciones):
        if transaccion.id == transaccion_id:
            return i
    raise HTTPException(status_code=404, detail="Transaccion no encontrada")


def serializar_factura(factura: FacturaDB) -> dict:
    data = factura.model_dump()
    data["valor_total"] = factura.valor_total()
    return data


def actualizar_transacciones_en_factura(factura_id: int) -> None:
    indice = obtener_indice_factura(factura_id)
    transacciones_factura = [
        t for t in lista_transacciones if t.factura_id == factura_id
    ]
    lista_facturas[indice].lista_transacciones = transacciones_factura


@app.get("/")
def inicio():
    return {"mensaje": "Sistema Integral ReCal Tech - FastAPI"}


@app.get("/clientes")
def listar_clientes():
    return {"clientes": lista_clientes}


@app.post("/clientes")
def crear_cliente(datos: Cliente):
    global id_cliente_inc
    nuevo = datos.model_dump()
    nuevo["id"] = id_cliente_inc
    lista_clientes.append(nuevo)
    id_cliente_inc += 1
    return {"mensaje": "Cliente creado satisfactoriamente", "cliente": nuevo}


@app.put("/clientes/{id}")
def editar_cliente(id: int, datos: Cliente):
    for i, cliente in enumerate(lista_clientes):
        if cliente["id"] == id:
            actualizado = datos.model_dump()
            actualizado["id"] = id
            lista_clientes[i] = actualizado
            return {"mensaje": "Cliente actualizado", "cliente": actualizado}
    raise HTTPException(status_code=404, detail="Cliente no encontrado")


@app.delete("/clientes/{id}")
def eliminar_cliente(id: int):
    for i, cliente in enumerate(lista_clientes):
        if cliente["id"] == id:
            eliminado = lista_clientes.pop(i)
            return {"mensaje": "Cliente eliminado", "datos_eliminados": eliminado}
    raise HTTPException(status_code=404, detail="Cliente no encontrado")


@app.get("/facturas")
def listar_facturas():
    return {"facturas": [serializar_factura(factura) for factura in lista_facturas]}


@app.get("/facturas/{factura_id}")
def obtener_factura(factura_id: int):
    indice = obtener_indice_factura(factura_id)
    return {"factura": serializar_factura(lista_facturas[indice])}


@app.post("/facturas")
def crear_factura(datos: FacturaCreate):
    global id_factura_inc
    if not any(c["id"] == datos.cliente for c in lista_clientes):
        raise HTTPException(status_code=404, detail="El cliente no existe")

    nueva_factura = FacturaDB(
        id=id_factura_inc,
        cliente=datos.cliente,
        lista_transacciones=[],
    )
    lista_facturas.append(nueva_factura)
    id_factura_inc += 1
    return {"mensaje": "Factura creada", "factura": serializar_factura(nueva_factura)}


@app.put("/facturas/{factura_id}")
def editar_factura(factura_id: int, datos: FacturaUpdate):
    if not any(c["id"] == datos.cliente for c in lista_clientes):
        raise HTTPException(status_code=404, detail="El cliente no existe")

    indice = obtener_indice_factura(factura_id)
    factura_actual = lista_facturas[indice]
    lista_facturas[indice] = FacturaDB(
        id=factura_actual.id,
        fecha=factura_actual.fecha,
        cliente=datos.cliente,
        lista_transacciones=factura_actual.lista_transacciones,
    )
    return {"mensaje": "Factura actualizada", "factura": serializar_factura(lista_facturas[indice])}


@app.delete("/facturas/{factura_id}")
def eliminar_factura(factura_id: int):
    indice = obtener_indice_factura(factura_id)
    factura_eliminada = lista_facturas.pop(indice)
    lista_transacciones[:] = [
        t for t in lista_transacciones if t.factura_id != factura_id
    ]
    return {"mensaje": "Factura eliminada", "factura": serializar_factura(factura_eliminada)}



    