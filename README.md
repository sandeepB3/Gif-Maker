# Gif Maker
Web app to convert video to gif using React hooks and web-assembly. The app uses a library called FFmpeg which is a utility written in C program. Using web assembly we can run this utility as an API call in javascript through which the program runs this software directly in the browser.
Thus it helps in performing CPU intensive video editing processs without the need for a backend server.

***
## Note:
The SharedArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer. Some browsers by default do not allow these raw binary data to be processed as the cbrowsers consider this data may harm the device. Hence the program works only when the accept SharedArrayBuffer flag of our browser is turned on.

PS: I couldnt implement the proper working of this program, as I am unable to locate the setting from where I could turn the accept SharedArrayBuffer flag on.
