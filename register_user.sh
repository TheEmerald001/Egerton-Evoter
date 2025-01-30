#!/bin/bash

# This script will be called by the Node.js backend to register a user
# It should accept username and email as arguments

NAME=$1
EMAIL=$4
PHONE=$2
REG_NO=$3
HALL=$5
FACULTY=$6

# Here you can add any additional logic, such as validation or sending a welcome email
echo "Registering user: $NAME with email: $EMAIL and phone: $PHONE Or Details: Reg:$REG_NO $ REG_NO, hall:$HALL and faculty: $FACULTY"

# Exit with a success status
exit 0
