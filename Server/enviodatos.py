import requests
import dht
import machine
import time

d = dht.DHT11(machine.Pin(5))

while(1):
    d.measure()
    print("temperatura:", d.temperature())
    print("humedad:", d.humidity())
    datos = requests.post('http://192.168.43.218:3000/test', data = {'temp':d.temperature(), 'hum':d.humidity()})
    print("\n\n")
    print("Codigo de estado: ", datos.status_code)
    print("Contenido entregado por el servidor:", datos.content)
    print("\n\n")
    time.sleep(5)
