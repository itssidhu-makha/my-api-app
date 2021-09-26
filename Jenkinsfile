pipeline{
    agent{
        label 'docker'
    }
    stages{

        stage('checkout'){
            git branch: 'main', credentialsId: 'GithubAccount', url: 'https://github.com/itssidhu-makha/my-api-app.git'
        }

        stage('build'){
          image = docker.build("itssidhu/my-api-app")
        }

        stage('Test'){
           image.inside{
             sh 'echo "image has been build successfully"'
           }
        }

        stage('push'){
            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                image.push("${env.BUILD_NUMBER}")
                image.push("latest")
            }
        }

        stage('Run'){
            docker.image('itssidhu/my-api-app').withRun('-p 2100:8800'){
                /* do things */
            }
        }

    }
}