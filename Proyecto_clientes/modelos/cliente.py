from pydantic import BaseModel, ConfigDict


class ClienteBase(BaseModel):
    nombre: str
    edad: int
    descripcion: str | None = None


class ClienteCreate(ClienteBase):
    pass


class ClienteUpdate(ClienteBase):
    pass


class ClienteDB(ClienteBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
