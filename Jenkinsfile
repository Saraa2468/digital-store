pipeline {
    agent any

    environment {
        
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Welcome') {
            steps {
                echo '🚀 Starting Digital-Store CI/CD Pipeline...'
            }
        }

        stage('Checkout Code') {
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
                    -Dsonar.exclusions=**/*.js,**/*.ts \
                    -Dsonar.ws.timeout=300"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
        
                sh 'docker build -t digital-store-app .'
            }
        }

        stage('Deploy to Production (CD)') {
            steps {
                script {
                   
                    sh 'docker rm -f digital-store-container || true'
                    
                      
                    sh 'docker run -d --name digital-store-container -p 8085:80 digital-store-app'
                }
                echo '✅ Application is live at http://localhost:8085'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline finished successfully! Great job Sara.'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs to fix the errors.'
        }
    }
}