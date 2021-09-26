pipeline{
    agent agent-api
    stages{
        
        stage('checkout code'){
            git branch: 'main', credentialsId: 'GithubAccount', url: 'https://github.com/itssidhu-makha/my-api-app.git'
        }

        stage('build image'){
          image = docker.build("itssidhu/my-api-app")
        }

        stage('Test the image'){
           image.inside{
             sh 'echo "image has been build successfully"'
           }
        }

        stage('push latest image changes'){
            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                image.push("${env.BUILD_NUMBER}")
                image.push("latest")
            }
        }

        stage('Run API App Image'){
            docker.image('itssidhu/my-api-app').withRun('-p 2100:8800'){
                /* do things */
            }
        }

    }
}