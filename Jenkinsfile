pipeline{

    environment{
        imagename = "itssidhu/my-api-app"
        workspace="${env.WORKSPACE}"
    }
    agent{
        label 'docker'
    }
    stages{

        stage('checkout'){
            steps{
            git branch: 'main', 
            credentialsId: 'GithubAccount',
            url: 'https://github.com/itssidhu-makha/my-api-app.git'
            }
        }

        stage('build'){
            steps{
                script{
                app = docker.build imagename                
                }
            }
          
        }

        // stage('Test'){
        //     steps{
        //         script{
        //         app.inside{
        //         sh 'echo "image has been build successfully"'
        //         }
        //         }
        //     }
           
        // }

        stage('push'){
            steps{
                script{
                docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-login'){
                    app.push("$BUILD_NUMBER")
                    app.push("latest")
                }
                }
            }
        }

        stage('Run'){
            steps{
                script{
                docker.image(imagename).withRun('-p 2100:8800'){
                    /* do things */
                }
                }
            }
        }

    }
}