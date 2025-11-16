//// --- outputs --- ////
// The GPIO pin (output) for the WS2811 light strip. 
export const PINOUT_LIGHTS = 16
// The built-in on-board LED on ESP WROOM 32.
export const PINOUT_ON_BOARD_LED = 2
// The GPIO pin (output, PWM) for the head servo.
export const PINOUT_HEAD_SERVO = 0
// The GPIO pin (output, PWM) for the front wheel servo.
export const PINOUT_FRONT_SERVO = 4
// The GPIO pin (output) for the motor driver's Input pin 1
// that controls the direction of the wheel. Backwards if HIGH.
export const PINOUT_DCMOTOR_PIN1 = 17
// The GPIO pin (output) for the motor driver's Input pin 2
// that controls the direction of the wheel. Forwards if HIGH.
export const PINOUT_DCMOTOR_PIN2 = 18
// The GPIO pin (output, PWM) for the DC motor driver enabler.
// This pin is for speed control, and enabling or 
// disabling of the motor itself.
export const PINOUT_DCMOTOR_ENABLE = 19
// The GPIO pin (input, ANALOG) for the TRIGGER PIN of the ultrasonic sensor.
export const PINOUT_ULTRASONIC_TRIG = 25

//// --- inputs --- ////
// The GPIO pin (input) for the temperature and humidity sensor.
export const PININ_DHT = 35
// The GPIO pin (input, ANALOG) for the photoresistive light sensor.
export const PININ_PHOTORESISTOR = 34
// The GPIO pin (input, ANALOG) for the ECHO PIN of the ultrasonic sensor.
export const PININ_ULTRASONIC_ECHO = 26
// The GPIO pin (input) for the A Button.
export const PININ_BTN_A = 32
// The GPIO pin (input) for the B Button.
export const PININ_BTN_B = 33

//// --- hardware constants --- ////
// The 0deg PWM duty cycle for the servo. Might differ per servo.
export const HARDWARE_SERVO_MINDUTY = 34
// The 180deg PWM duty cycle for the servo. Might differ per servo.
export const HARDWARE_SERVO_MAXDUTY = 136
// By default, Pin.duty does not block. Hence, the 
// project adds a time.sleep after Pin.duty to have 
// some blocking to ensure the servo turns fully. 
// This line defines how long the blocking time is.
export const HARDWARE_SERVO_BLOCKING_TIME = .5
