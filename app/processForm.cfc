<cffunction name="sendEmail" access="remote" returntype="any" returnformat="json" displayname="Sends Contact Form Email">
<cfargument name="firstName" type="string" required="yes">
<cfargument name="lastName" type="string" required="yes">
<cfargument name="phone" type="string" required="yes">
<cfargument name="email" type="string" required="yes">
<cfargument name="message" type="string" required="yes">

<cfset valid = "">

	
<cftry>
  <cfmail to="lisel.jensen@simplot.com" from="#email#" subject="Careers Contact Form Submission From: #firstName# #lastName#">
<!---  <cfmail to="careers@simplot.com" bcc="lisel.jensen@simplot.com" from="#email#" subject="Careers Contact Form Submission From: #firstName# #lastName#">--->
    First Name: #firstName#
    Last Name: #lastName#
    Phone: #phone#
    Email: #email#
    Message: #message#
  </cfmail> 
  <cfmail to="#email#" from="noreply@simplot.com" subject="J.R. Simplot Form Submission">
	  Thank you for your message.

	  J.R. Simplot Company
  </cfmail>
  
  <cfset valid ="true">

	<cfcatch>
		<cfset valid="false">
  </cfcatch>
</cftry>
        
<cfreturn valid>
</cffunction>