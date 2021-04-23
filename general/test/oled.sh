128*64 5*7 *2
Rad 1 789 1
Rad 2 789 1
Rad 3 789 1
Rad 4 789 1
Rad 5 789 1

wget -O - http://composepi/api/oled/clear
wget -O - http://composepi/api/oled/writeline/Rad%201%207890%201
wget -O - http://composepi/api/oled/writeline/Rad%202%207890%201
wget -O - http://composepi/api/oled/writeline/Rad%203%207890%201
wget -O - http://composepi/api/oled/writeline/Rad52045207890%201
wget -O - http://composepi/api/oled/writeline/Rad52055207890%201


   12:34 
 Mån 12/12
U:12   A:21
K:12   Ä:21

1. Decimaljustering digitsbeforedot=2 digitsafterdot=0 dot=always/never/auto
2. clear. Reset blinks
3. writelines. Testa {}. Testa line1=xxxxy
4. Replace :. (x,y,oldletter,newletter) used by Blink   :. (x,y,letter)
5. Font multiplier: ?multiplier=2
