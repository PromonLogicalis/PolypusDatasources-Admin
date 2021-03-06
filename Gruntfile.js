module.exports = function (grunt) {
    grunt.config('build_number', grunt.option('build_number') || process.env.BUILD_NUMBER || 'SNAPSHOT<%= grunt.template.today("yyyymmddHHMMss") %>');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        easy_rpm: {
            options: {
                name: 'polypus-admin',
                summary: 'Polypus Admin',
                description: 'Static files for Web Admin client for Polypus',
                version: '<%= pkg.version %>',
                release: grunt.config('build_number'),
                buildArch: 'noarch',
                vendor: 'Logicalis',
                group: 'Application',
                license: 'Closed',
                defaultAttributes: {
                    mode: 644,
                    user: 'polypus',
                    group: 'polypus',
                    dirMode: 755
                }
            },
            release: {
                files: [
                    {cwd: "build", src: "**/*", dest: '/opt/polypus/admin'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-easy-rpm');

    grunt.registerTask('default', ['easy_rpm']);
};