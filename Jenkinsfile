pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'rsync -avz build/ root@r3vv1l.fvds.ru:/var/www/html/bot/'
            }
        }
    }
}