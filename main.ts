from microbit import *
import radio
import music

# Attiva e configura la radio
radio.on()
radio.config(group = 10, power = 2)

contatore_prove = 1
in_trasmissione = False  # All'avvio la trasmissione è ferma

while True:
    #-- - GESTIONE DEL DISPLAY-- -
    if in_trasmissione:
        # Se la prova è partita, mostra il numero fisso
display.show(str(contatore_prove))
    else:
        # Se è fermo in attesa, mostra l'icona della faccina stupita
display.show(Image.SURPRISED)

    #-- - AVVIO TRASMISSIONE / CAMBIO PROVA(PULSANTE A)-- -
    if button_a.was_pressed():
    if not in_trasmissione:
            # Primo click: fa partire la Prova 1
in_trasmissione = True
music.play("C5:2")  # Bip di avvio
        else:
            # Click successivi: passa alla Prova 2, 3, 4...
    contatore_prove += 1
music.play("E5:1")  # Bip di cambio prova

    #-- - RESET E BLOCCO(PULSANTE B)-- -
    if button_b.was_pressed():
    contatore_prove = 1
in_trasmissione = False  # Ferma la trasmissione
music.play("C4:4")       # Nota di reset
display.clear()          # Spegne lo schermo per confermare lo stop
sleep(500)

    #-- - INVIO SEGNALE RADIO-- -
    if in_trasmissione:
        # Invia continuamente il segnale della prova attuale(p: 1, p: 2...)
radio.send("p:" + str(contatore_prove))
        
        # Fa lampeggiare un puntino nell'angolo per mostrare che sta trasmettendo
display.set_pixel(4, 4, 9)
sleep(50)
display.set_pixel(4, 4, 0)
sleep(50)
    else:
sleep(10)
