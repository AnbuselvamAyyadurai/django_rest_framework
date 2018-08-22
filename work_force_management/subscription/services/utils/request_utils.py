#!python
#
# This source file is an intellectual property of Onymy Infocomm (P) Ltd.
# The code cannot be copied or distributed without permissions
#

#This function helps check required form elements
def check_post_request(request, elements):
    
    for element in elements:
        if element not in request.data:
            return False

    return True

def check_get_request(request, elements):
    
    for element in elements:
        if element not in request.GET:
            return False

    return True

def check_post_jsonrequest(jsonrequest, elements):
    
    for element in elements:
        if element not in jsonrequest:
            return False

    return True