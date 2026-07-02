from datetime import datetime

from pydantic import BaseModel, ConfigDict

from .transaccion import TransaccionDB


class FacturaBase(BaseModel):
    cliente: int


class FacturaCreate(FacturaBase):
    pass


class FacturaUpdate(FacturaBase):
    pass


class FacturaDB(BaseModel):
    id: int
    fecha: datetime
    cliente: int
    lista_transacciones: list[TransaccionDB] = []

    model_config = ConfigDict(from_attributes=True)

    def valor_total(self) -> float:
        return sum(
            transaccion.valor_unitario * transaccion.cantidad
            for transaccion in self.lista_transacciones
        )

    @classmethod
    def from_orm_factura(cls, factura_orm) -> "FacturaDB":
        return cls(
            id=factura_orm.id,
            fecha=factura_orm.fecha,
            cliente=factura_orm.cliente_id,
            lista_transacciones=[
                TransaccionDB.model_validate(t) for t in factura_orm.transacciones
            ],
        )
