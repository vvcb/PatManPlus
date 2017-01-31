# PatManPlus

[![Build Status](https://travis-ci.org/vvcb/PatManPlus.svg?branch=master)](https://travis-ci.org/vvcb/PatManPlus)

### Next-Gen Patient Lists
Welcome to the next-generation patient list manager PatManPlus.

This will change the life of every junior doctor in the NHS.

Firstly thank you very  much for considering to contribute on this project. Before you do so can you please ensure you read through these guidelines so that you understand the situation around the problem at hand.

The software is designed to allow junior doctors to manage their patient lists to provide an efficient way to complete a ward round and also manage the various jobs assigned to that ward. It replaces more archaic systems currently in place. Such as MS Word documents, MS Excel spreadsheets, MS Access databases and paper based alternatives.

PatManPlus is a program that will be stored on the network drive of a hospital, it is accessed using an exe file. It has been created using Electron, JavaScript, HTML, CSS and SQLite. This allows it to be serverless which is one of the main requirements.

### Overview

This application was developed in response to a very specific set of business needs - an inability to install software, tight restrictions on installation posssibilities and restricted maintenance resources.

It is built on top of Electron (similar to Atom, Visual Studio Code and others) and makes use of NodeJS and SQLite 3.

### Purpose
The software is designed to allow junior doctors to manage their patient lists to provide an efficient way to complete a ward round and also manage the various jobs assigned to that ward. It replaces more archaic systems currently in place. Such as MS Word documents, MS Excel spreadsheets, MS Access databases and paper based alternatives. To find out more about the way this is managed see The Ward Round.

### MVP
An MVP has been developed to allow replication of the current system. There are further features and improvements that have been identified within issues.

### Technology
PatManPlus is a program that will be stored on the network drive of a hospital, it is accessed using an exe file. It has been created using Electron, JavaScript, HTML, CSS and SQLite. This allows it to be serverless which is one of the main requirements.

### Contribution
If you wish to contribute then please see the contribution section.

To communicate with the contributors please join the Slack conversation

GitHub: https://github.com/vvcb/PatManPlus

Fork, pull, push, commit, collaborate…

## The Ward Round

### What is the Ward Round?

The patients in hospital are all under the care of a team or a particular ward. The ward round is a process by which each patient gets a visit by a doctor or a team of doctors each day. This daily visit allows for the whole team to catch up with how the patient is progressing, look at their latest test results, and make a plan for the following few days.

### What are the current problems with the ward round?

With a healthcare system increasingly under strain in terms of numbers of patients, beds available and manpower, teams have become more responsible for more and more patients and these patients have been be spread out across many wards. This means that teams have to keep a list of patients, their locations and the current plan.

### How is this done now and why isn’t it working?

Traditionally team have kept lists of patients on word documents, which are printed and on which junior doctors write the list of jobs that have been decided on the ward round. These jobs are then assigned to a team member by hand. These word documents are stored on the hospital shared drive and are updated daily usually at the end of the day and not in real time. However because doctors are often called away from their work when they are updating the list, these documents are often left open meaning that it cannot be accessed by anyone else except in read-only form. This means that the shared drive often ends up with multiple versions of the same patient list which can lead to errors.

### What do we need?

We need a patient list that can be updated in real-time on the ward round. This will allow jobs to be add more accurately and in a timely fashion. We also need a patient list that can be updated from multiple locations and can be sorted by ward, consultant and team. This will allow the ward round to be more efficient.

## The NHS Hack-Day Team

PatManPlus was developed over a weekend fuelled with plenty of crazy enthusiasm, coffee, fruit slices and just a little bit of alcohol by a team of software developers and doctors.

## Contributing Guidelines for PatManPlus

### Restrictions of a Hospital

Obviously there are various restrictions in place within hospitals in terms of security and the ability to install and access software. Please be aware of this, read through the detail within The Ward Round to fully understand the current problem. Also note it is not always possible to install new software on hospital servers. The system needs to be accessible on a shared network drive but accessible through a simple interface. This is why the approach has been taken to produce an exe file that can be accessed through the network drives in a hospital. Note that the system will be standalone for each ward that wishes to use it. There is no need have them talk to each other.

### Features required

All features that are required have been listed within Issues. Please read through these, if you can contribute to these features then this would be fantastic. Please can you follow the process below

- open the issue that relates to the feature you wish to work on  
- in this issue please comment that you would like to work on it  
- one of the maintainers will label the issue as being worked on  
- you are then free to work on the feature and submit a pull request referencing the issue  
- You can also get further clarification by requesting to join the Slack message group for this project.  

### New Feature Suggestions

Before you suggest a new feature please read through the issue lists of to see if your feature isn’t already in place or in development. If you decide the feature is new then please follow the steps below

- raise your feature as an issue through GitHub  
- these will be reviewed to decide upon the suitability for the hospital environment  
- if accepted the label of the issue will be changed to worked on  
- it will then be assigned to you accordingly if accepted.   

### Bugs

When reporting a bug through a new issue please put the detail below and respond in line accordingly

- what is the current behavior?  
- if the current behavior is a bug, please provide the steps to reproduce.  
- what is the expected behavior?  
- please mention your operating system version and the version of PatManPlus.  

### Development setup

You will need the following installed:
- [NodeJS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [Yarn](https://yarnpkg.com/en/docs/install) (optional, but preferred)

Checkout the project
- `$ git clone git@github.com:vvcb/PatManPlus.git`

To build the project you will need to run the following commands:
- `$ cd PatManPlus`
- `$ yarn` (preferred) or `$ npm install`

To run the application, you should run the following command:
- `$ npm run dev`

### Building and Packaging

This section explains how to build and package the application.

### Running the Application

This section explains how to run the application.

### Configuration

This section explains how to configure the application, mostly the shared folder where the database file will be stored.
