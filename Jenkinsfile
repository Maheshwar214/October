pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Source') {
            steps {
                sh '''
                    test -f site/index.html
                    test -f site/style.css
                    test -f site/script.js
                    test -f Dockerfile
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t shopkart:${BUILD_NUMBER} .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker rm -f shopkart || true
                    docker run -d \
                      --name shopkart \
                      --restart unless-stopped \
                      -p 80:80 \
                      shopkart:${BUILD_NUMBER}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    docker ps --filter name=shopkart
                    curl --fail --retry 5 --retry-delay 2 http://localhost/
                '''
            }
        }
    }
}
