@Library('deploy')
import deploy

def deployLib = new deploy()

node {
    def commitHash, commitHashShort, commitUrl
    def project = "navikt"
    def app = "foreldrepengesoknad"
    def committer, committerEmail, releaseVersion
    def appConfig = "nais.yaml"
    def dockerRepo = "repo.adeo.no:5443"
    def branch = "master"
    def groupId = "nais"
    def environment = 't1'
    def zone = 'sbs'
    def namespace = 'default'

    stage("Checkout") {
        cleanWs()
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
            sh(script: "git clone https://github.com/${project}/${app}.git -b ${branch} .")
        }
        commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        commitHashShort = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        commitUrl = "https://github.com/${project}/${app}/commit/${commitHash}"
        committer = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
        committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()

        releaseVersion = "${env.major_version}.${env.BUILD_NUMBER}-${commitHashShort}"
        echo "release version: ${releaseVersion}"
    }

    stage("Build & publish") {
        withEnv(['HTTPS_PROXY=http://webproxy-internett.nav.no:8088',
                 'NO_PROXY=localhost,127.0.0.1,.local,.adeo.no,.nav.no,.aetat.no,.devillo.no,.oera.no',
                 'no_proxy=localhost,127.0.0.1,.local,.adeo.no,.nav.no,.aetat.no,.devillo.no,.oera.no',
                 'NODE_TLS_REJECT_UNAUTHORIZED=0'
        ]) {
            System.setProperty("java.net.useSystemProxies", "true")
            System.setProperty("http.nonProxyHosts", "*.adeo.no")
            sh "npm install"
            sh "npm run jest"
            sh "npm run build"
        }

        sh "docker build --build-arg version=${releaseVersion} --build-arg app_name=${app} -t ${dockerRepo}/${app}:${releaseVersion} ."

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            sh "docker login -u ${env.USERNAME} -p ${env.PASSWORD} ${dockerRepo} && docker push ${dockerRepo}/${app}:${releaseVersion}"
            sh "curl --fail -v -u ${env.USERNAME}:${env.PASSWORD} --upload-file ${appConfig} https://repo.adeo.no/repository/raw/${groupId}/${app}/${releaseVersion}/nais.yaml"
        }

        slackSend([
            color: 'good',
            message: "Build <${env.BUILD_URL}|#${env.BUILD_NUMBER}> (<${commitUrl}|${commitHashShort}>) of ${project}/${app}@master by ${committer} passed"
         ])
    }

    stage("Deploy to preprod") {
        parallel 'T10': {
            stage("T10") {
                withEnv(['HTTPS_PROXY=http://webproxy-internett.nav.no:8088',
                         'NO_PROXY=localhost,127.0.0.1,.local,.adeo.no,.nav.no,.aetat.no,.devillo.no,.oera.no',
                         'no_proxy=localhost,127.0.0.1,.local,.adeo.no,.nav.no,.aetat.no,.devillo.no,.oera.no'
                ]) {
                    System.setProperty("java.net.useSystemProxies", "true")
                    System.setProperty("http.nonProxyHosts", "*.adeo.no")
                    callback = "${env.BUILD_URL}input/Deploy/"
                    def deploy = deployLib.deployNaisApp(app, releaseVersion, 't10', zone, 't10', callback, committer).key
                    echo "Check status here:  https://jira.adeo.no/browse/${deploy}"
                    try {
                        timeout(time: 15, unit: 'MINUTES') {
                            input id: 'deploy', message: "Check status here:  https://jira.adeo.no/browse/${deploy}"
                        }
                        slackSend([
                                color  : 'good',
                                message: "${app} version ${releaseVersion} has been deployed to T10."
                        ])
                    } catch (Exception ex) {
                        slackSend([
                                color  : 'danger',
                                message: "Unable to deploy ${app} version ${releaseVersion} to T10. See https://jira.adeo.no/browse/${deploy} for details"
                        ])
                        throw new Exception("Deploy feilet :( \n Se https://jira.adeo.no/browse/" + deploy + " for detaljer", ex)
                    }
                }
            }
        }, 'Q1': {
            stage("Q1") {
                withEnv(['HTTPS_PROXY=http://webproxy-internett.nav.no:8088',
                         'NO_PROXY=localhost,127.0.0.1,.local,.adeo.no,.nav.no,.aetat.no,.devillo.no,.oera.no',
                         'no_proxy=localhost,127.0.0.1,.local,.adeo.no,.nav.no,.aetat.no,.devillo.no,.oera.no'
                ]) {
                    System.setProperty("java.net.useSystemProxies", "true")
                    System.setProperty("http.nonProxyHosts", "*.adeo.no")
                    callback = "${env.BUILD_URL}input/Deploy/"
                    def deploy = deployLib.deployNaisApp(app, releaseVersion, 'q1', zone, namespace, callback, committer).key
                    echo "Check status here:  https://jira.adeo.no/browse/${deploy}"
                    try {
                        timeout(time: 15, unit: 'MINUTES') {
                            input id: 'deploy', message: "Check status here:  https://jira.adeo.no/browse/${deploy}"
                        }
                        slackSend([
                                color  : 'good',
                                message: "${app} version ${releaseVersion} has been deployed to Q1."
                        ])
                    } catch (Exception ex) {
                        slackSend([
                                color  : 'danger',
                                message: "Unable to deploy ${app} version ${releaseVersion} to Q1. See https://jira.adeo.no/browse/${deploy} for details"
                        ])
                        throw new Exception("Deploy feilet :( \n Se https://jira.adeo.no/browse/" + deploy + " for detaljer", ex)
                    }
                }
            }
        }
    }

    stage("Deploy to prod") {
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088',
               'NO_PROXY=localhost,127.0.0.1,.local,.adeo.no,.nav.no,.aetat.no,.devillo.no,.oera.no',
               'no_proxy=localhost,127.0.0.1,.local,.adeo.no,.nav.no,.aetat.no,.devillo.no,.oera.no'
              ]) {
            System.setProperty("java.net.useSystemProxies", "true")
            System.setProperty("http.nonProxyHosts", "*.adeo.no")
            try {
                timeout(time: 5, unit: 'MINUTES') {
                    input id: 'prod', message: "Deploy to prod?"
                }
            } catch (Exception ex) {
                echo "Timeout, will not deploy to prod"
                currentBuild.result = 'SUCCESS'
                return
            }

            callback = "${env.BUILD_URL}input/Deploy/"
            def deploy = deployLib.deployNaisApp(app, releaseVersion, 'p', zone, namespace, callback, committer, false).key
            try {
                timeout(time: 15, unit: 'MINUTES') {
                    input id: 'deploy', message: "Check status here:  https://jira.adeo.no/browse/${deploy}"
                }

                slackSend([
                    color: 'good',
                    message: "${app} version ${releaseVersion} has been deployed to production."
                ])
            } catch (Exception e) {
                slackSend([
                   color: 'danger',
                   message: "Unable to deploy ${app} version ${releaseVersion} to production. See https://jira.adeo.no/browse/${deploy} for details"
               ])
                throw new Exception("Deploy feilet :( \n Se https://jira.adeo.no/browse/" + deploy + " for detaljer", e)
            }
        }
    }

}
