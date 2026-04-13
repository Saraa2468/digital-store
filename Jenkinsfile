pipeline {
    agent any

    environment {
        // تأكدي إن الاسم هنا مطابق للي في Global Tool Configuration
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // 'scm' هنا معناها "اسحب الكود من المستودع اللي أنت فيه حالياً"
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // تأكدي إن 'sonarqube' مطابق للي في Configure System
                withSonarQubeEnv('sonarqube') { 
                    sh "${SCANNER_HOME}/bin/sonar-scanner \
                    -Dsonar.projectKey=digital-store \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://sonarqube:9000"
                }
            }
        }
    }
}