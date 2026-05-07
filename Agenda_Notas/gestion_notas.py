import os

# Nombre del archivo donde se guardará la información
ARCHIVO = "historial_notas.txt"

def crear_nota(tarea, inicio, fin, estado):
    """Función para añadir una nueva línea al archivo txt"""
    try:
        with open(ARCHIVO, "a", encoding="utf-8") as f:
            # Usamos pipe | como separador para facilitar la lectura posterior
            f.write(f"{tarea}|{inicio}|{fin}|{estado}\n")
        return True
    except Exception as e:
        print(f"Error al escribir en el archivo: {e}")
        return False

def obtener_historial():
    """Función para leer y retornar todas las notas en una lista"""
    lista_notas = []
    if not os.path.exists(ARCHIVO):
        return lista_notas
    
    try:
        with open(ARCHIVO, "r", encoding="utf-8") as f:
            for linea in f:
                # Limpiar saltos de línea y separar por el delimitador
                datos = linea.strip().split("|")
                if len(datos) == 4:
                    lista_notas.append(datos)
    except Exception as e:
        print(f"Error al leer el archivo: {e}")
    
    return lista_notas