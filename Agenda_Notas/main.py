import gestion_notas
from datetime import date

def imprimir_menu():
    print("\n" + "="*40)
    print("      SISTEMA DE GESTIÓN DE NOTAS")
    print("="*40)
    print("1. Crear Nota")
    print("2. Ver Notas (Actuales)")
    print("3. Ver Historial Completo")
    print("4. Salir")
    print("="*40)

def main():
    while True:
        imprimir_menu()
        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            print("\n--- NUEVA TAREA ---")
            tarea = input("Nombre de la tarea: ")
            fecha_inicio = str(date.today()) # Captura fecha actual automáticamente
            fecha_final = input("Fecha de entrega (DD/MM/AAAA): ")
            
            print("Estados: 1. Pendiente | 2. Realizado")
            est_op = input("Seleccione estado: ")
            estado = "Realizado" if est_op == "2" else "Pendiente"

            if gestion_notas.crear_nota(tarea, fecha_inicio, fecha_final, estado):
                print("\n[OK] Nota guardada correctamente.")

        elif opcion == "2" or opcion == "3":
            print("\n--- REGISTRO DE NOTAS ---")
            notas = gestion_notas.obtener_historial()
            
            if not notas:
                print("No hay registros en el sistema.")
            else:
                # Formateo de salida para que se vea como tabla
                print(f"{'TAREA':<15} | {'INICIO':<12} | {'FIN':<12} | {'ESTADO'}")
                print("-" * 60)
                for n in notas:
                    print(f"{n[0]:<15} | {n[1]:<12} | {n[2]:<12} | {n[3]}")

        elif opcion == "4":
            print("Cerrando el sistema. ¡Éxito en sus estudios!")
            break
        else:
            print("Opción no válida, intente de nuevo.")

if __name__ == "__main__":
    main()