pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        DOCKER_IMAGE = "sarasalah24/digital-store"
    }

    stages {
        stage('Welcome') {
            steps {
                echo '🚀 Starting Digital-Store Pro CI/CD Pipeline...'
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
                    -Dsonar.exclusions=**/*.js,**/*.ts,**/*.css,**/*.scss,**/node_modules/** \
                    -Dsonar.language.js.skip=true \
                    -Dsonar.language.ts.skip=true \
                    -Dsonar.ws.timeout=300"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    
                    sh "export DOCKER_HOST=tcp://host.docker.internal:2375 && docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Image Scan (Trivy)') {
            steps {
                
                sh "trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                        sh "export DOCKER_HOST=tcp://host.docker.internal:2375 && docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Local (Validation)') {
            steps {
                script {
                    
                    sh 'export DOCKER_HOST=tcp://host.docker.internal:2375 && docker rm -f digital-store-container || true'
                    sh "export DOCKER_HOST=tcp://host.docker.internal:2375 && docker run -d --name digital-store-container -p 8085:80 ${DOCKER_IMAGE}:latest"
                }
                echo '✅ Application is live at http://localhost:8085'
            }
        }
    }

    post {
        success {
            echo '🎉 SUCCESS: Image pushed to Docker Hub and local container is running!'
        }
        failure {
            echo '❌ FAILURE: Something went wrong. Check the logs above.'
        }
    }
}