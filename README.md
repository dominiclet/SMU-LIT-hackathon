## Problem
With LAB’s strict legal aid requirements, low bono and pro bono cases are currently taken up through connections with no central space to find such legal help.

## Solution
Lawmatch bridges this gap by intelligently matching financially needy individuals with lawyers who are keen to do pro-bono or low-bono work. 

## Signing Up
Clients who have been referred by LAB would be able to sign up for the platform, ensuring we cater to the most appropriate demographic. By providing access tokens to our legal partners, we ensure the requirement of being financially needy is certain.

## Matching Algorithm
LawMatch uses the following criteria to ensure that our clients are matched to lawyers who best meet their needs: 
- Lawyer’s expertise 
- Budget
- Availability
- Preferred Languages
- Gender
## Natural Language Processing 
If clients do not know what area of law their issues fall under, our NLP tool is able to identify the area of law by processing the client’s description of their case.
We used a bag-of-words model. Features were extracted from case law for use in our ML model. We performed NLP by converting filenames and corpuses into a dataframe, followed by text preprocessing using the bag of words algorithm and TF-lDF scoring method . Finally, we performed modelling and obtained the area of law for each corpus.

## Selecting a Lawyer
On the clients’ dashboard, statistics regarding the average costs of similar cases are available to them, enabling them to make an informed decision on whether to proceed with engaging the lawyer. 

By increasing access and providing clearer information, we hope the journey to a more equal and just society is within reach.

