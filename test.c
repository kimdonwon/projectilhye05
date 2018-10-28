#include <ESP8266WiFi.h>

int measurePin = A0;
int ledPower = D2;

int samplingTime = 280;
int deltaTime = 40;
int sleepTime = 9680;
int i = 0;
int z = 0;

float value[10];
float voMeasured = 0.0;
float calcVoltage = 0.0;
float dustDensity = 0.0;
float ave = 0.0;

const char* ssid = "핫스팟아이디";
const char* password = "비밀번호";

const char* host = "ehddnjs0728.iptime.org";



void setup(){
Serial.begin(9600);
pinMode(ledPower, OUTPUT);
delay(10);
Serial.println();
Serial.println();
Serial.print("Connecting to ");
Serial.println(ssid);

WiFi.begin(ssid, password);

while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}
Serial.println("");
Serial.println("WiFi connected");



Serial.println(WiFi.localIP());
}

void loop(){



  WiFiClient client;

  const int httpPort = 80;

  if (!client.connect(host, httpPort)) {

    Serial.println("connection failed");

    return;

  }


  String url = "/senddata/";
  url += "1/"
  url += ave;


  Serial.print("Requesting URL: ");
  Serial.println(url);

  // This will send the request to the server

  client.print(String("GET ") + url + " HTTP/1.1\r\n" +

               "Host: " + host + "\r\n" +

               "Connection: close\r\n\r\n");

  int timeout = millis() + 5000;

  while (client.available() == 0) {

    if (timeout - millis() < 0) {

      Serial.println(">>> Client Timeout !");

      client.stop();

      return;

    }

  }



  // Read all the lines of the reply from server and print them to Serial

  while(client.available()){

    String line = client.readStringUntil('\r');

    Serial.print(line);

  }



  Serial.println();

  Serial.println("closing connection");
z = 1;

}
