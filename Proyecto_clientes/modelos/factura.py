from datetime import datetime
from pydantic import BaseModel, Field

from .transaccion import TransaccionDB


class FacturaBase(BaseModel):
    cliente: int


class FacturaCreate(FacturaBase):
    pass


class FacturaUpdate(FacturaBase):
    pass


class FacturaDB(FacturaBase):
    id: int
    fecha: datetime = Field(default_factory=datetime.now)
    lista_transacciones: list[TransaccionDB] = Field(default_factory=list)

    def valor_total(self) -> float:
        return sum(
            transaccion.valor_unitario * transaccion.cantidad
            for transaccion in self.lista_transacciones
        )
