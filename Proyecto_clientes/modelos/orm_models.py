from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class ClienteORM(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    edad = Column(Integer, nullable=False)
    descripcion = Column(String, nullable=True)

    facturas = relationship(
        "FacturaORM", back_populates="cliente", cascade="all, delete-orphan"
    )


class FacturaORM(Base):
    __tablename__ = "facturas"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(DateTime, default=datetime.now)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=False)

    cliente = relationship("ClienteORM", back_populates="facturas")
    transacciones = relationship(
        "TransaccionORM", back_populates="factura", cascade="all, delete-orphan"
    )


class TransaccionORM(Base):
    __tablename__ = "transacciones"

    id = Column(Integer, primary_key=True, index=True)
    valor_unitario = Column(Float, nullable=False)
    cantidad = Column(Integer, nullable=False)
    factura_id = Column(Integer, ForeignKey("facturas.id"), nullable=False)

    factura = relationship("FacturaORM", back_populates="transacciones")
