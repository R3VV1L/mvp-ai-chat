pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building ....'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying ....'
                sh 'rsync -avz dist/ root@r3vv1l.fvds.ru:/var/www/html/bot/'
            }
        }
    }
}
