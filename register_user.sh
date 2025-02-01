#!/bin/bash

# This script will be called by the Node.js backend to register a user
NAME=$1
EMAIL=$4
PHONE=$2
REG_NO=$3
HALL=$5
FACULTY=$6

# Once the passed parameters are provided:
# i. Provide the google link to commence submission

# Google Form URL
FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLSepMrZt5LrLKrNxABxhoqKcNlclmXMM5_TbSIF80S4Z-bmJ8g/formResponse"

# ii. try to autofill the form and make a submission
FIELD_NAME="entry.2092238618"      
FIELD_PHONE="entry.1519488515"      
FIELD_REG_NO="entry.1318791352"     
FIELD_EMAIL="entry.1556369182"      
FIELD_HALL="entry.785290042"      
FIELD_FACULTY="entry.1165384023"

# Submit the form using curl
curl -X POST "$FORM_URL" \
  -d "$FIELD_NAME=$NAME" \
  -d "$FIELD_PHONE=$PHONE" \
  -d "$FIELD_REG_NO=$REG_NO" \
  -d "$FIELD_EMAIL=$EMAIL" \
  -d "$FIELD_HALL=$HALL" \
  -d "$FIELD_FACULTY=$FACULTY" \
  --silent --output /dev/null

# iii. log the responese and save to the databse the specific entry if it was a success.
if [ $? -eq 0 ]; then
  echo "Google Form submitted successfully for user: $NAME with email: $EMAIL, phone: $PHONE, registration number: $REG_NO, hall: $HALL, and faculty: $FACULTY."
  exit 0
else
  echo "Failed to submit Google Form for user: $NAME."
  exit 1
fi
