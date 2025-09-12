#!/bin/bash
cd /home/kavia/workspace/code-generation/india-internship-connect-4108-4117/pmis_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

