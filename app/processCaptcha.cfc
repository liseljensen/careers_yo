<cffunction name="processCaptcha" access="remote" returntype="any" returnformat="json" displayname="Processes Google Recaptcha">
<cfargument name="captcha" type="string" required="yes">

<cfset valid = "">

<cftry>
	
	<cfhttp method="Post" 
		url="https://www.google.com/recaptcha/api/siteverify"> 
		<cfhttpparam type="Formfield" value="6LdADhcTAAAAADq3ef28t2YeeuBUqDjtwm4z8QPl" name="secret">
		<cfhttpparam type="Formfield" value="#captcha#" name="response">
	</cfhttp> 
	<cfset response = deserializeJSON(cfhttp.filecontent)>
	<cfif repsonse.success EQ true>
		<cfset valid ="true">
	<cfelse>
		<cfset valid ="false">
	</cfif>

	<cfcatch>
		<cfset valid="false">
  </cfcatch>
</cftry>
        
<cfreturn valid>
</cffunction>