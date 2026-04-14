pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Welcome') {
            steps {
                echo 'Pipeline Started Successfully!'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Sonar Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner \
                    -Dsonar.projectKey=digital-store \
                    -Dsonar.sources=. \
                    -Dsonar.exclusions=**/*.js,**/*.ts"
                }
            }
        }
    }
}