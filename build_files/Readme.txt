***Note: Before running this module, Node.js must be installed on your system. If it is not already installed, please download and install it from this link {https://nodejs.org/en}.
To check if Node.js is installed correctly and to verify its version, 
open a command prompt or terminal and type the following command:
		=> node -v


If you are working with Node.js for the first time:
		=> Run the nodeInitial.bat file by double-clicking on it.

		=> Setting up the IIS Settings for port rerouting
			=>> STEP-1 -> Install url rewrite -> https://www.iis.net/downloads/microsoft/url-rewrite
			=>> STEP-2 -> Install Application Request Routing -> https://www.iis.net/downloads/microsoft/application-request-routing
			=>> STEP-3 -> open IIS and Click on the server node (root) → double-click "Application Request Routing Cache"
							On the right-hand side, click Server Proxy Settings → check Enable proxy → Apply


To configure this module as External module, follow the below Steps:
===================================================================

1> First keep the published folder in this path -> C:\inetpub\wwwroot and Convert To Application

2> To configure the module as a External Function
	a) Go to  > Settings > Configure Transactions> External Modules 
		i) On Event => On Menu
		ii) Module Type => URL
		iii) URL => /prj_bafco_job_register/job_register/
		iv) Menu Name => `{as required}`
		v) Then click on Insert and Update.

3> Run the _prj_start.bat {double Click on _prj_start.bat}

To stop the old module go to the path: C:\inetpub\wwwroot/prj_bafco_job_register/job_register/job_register_server in powershell as admin and run the command>> npm run delete
***********************************************************************************************************************************************************************

