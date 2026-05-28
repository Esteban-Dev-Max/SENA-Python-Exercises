from pydantic import BaseModel


class TransaccionBase(BaseModel):
    valor_unitario: float
    cantidad: int
    factura_id: int


class TransaccionCreate(TransaccionBase):
    pass


class TransaccionUpdate(TransaccionBase):
    pass


class TransaccionDB(TransaccionBase):
    id: int
