pipeline {
    agent any

    environment {
        
        DOCKER_IMAGE = "sarasalah24/digital-store"
        DOCKER_CRED_ID = 'dockerhub-cred'
        K8S_CONFIG_ID = 'k8s-config'
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

        stage('Build Docker Image') {
            steps {
                script {
                    
                
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        //stage('Image Scan (Trivy)') {
           // steps {
                
              //  sh "trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE}:latest"
           // }
       // }

        stage('Push to Docker Hub') {
            steps {
                script {
                    
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                        sh "export DOCKER_HOST=tcp://172.17.0.1:2375 && docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    
                    withCredentials([file(credentialsId: "${K8S_CONFIG_ID}", variable: 'KUBECONFIG')]) {
                        
                        sh "kubectl --kubeconfig=\$KUBECONFIG apply -f deployment.yaml"
                        sh "kubectl --kubeconfig=\$KUBECONFIG apply -f service.yaml"
                        
                        echo "✅ Application Deployed to Kubernetes Cluster!"
                        sh "kubectl --kubeconfig=\$KUBECONFIG get pods"
                    }
                }
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline finished successfully! Your app is live.'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs to fix the issue.'
        }
    }
}