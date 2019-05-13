module.exports = {
    externals: {
        '@redhat-cloud-services/frontend-components-utilities': {
            commonjs: '@redhat-cloud-services/frontend-components-utilities',
            commonjs2: '@redhat-cloud-services/frontend-components-utilities',
            amd: '@redhat-cloud-services/frontend-components-utilities',
            root: 'FECUtilities'
        },
        '@patternfly/react-icons': {
            commonjs: '@patternfly/react-icons',
            commonjs2: '@patternfly/react-icons',
            amd: '@patternfly/react-icons',
            root: 'PFReactIcons'
        },
        '@patternfly/react-core': {
            commonjs: '@patternfly/react-core',
            commonjs2: '@patternfly/react-core',
            amd: '@patternfly/react-core',
            root: 'PFReactCore'
        },
        'prop-types': 'prop-types',
        react: 'react',
        'react-redux': 'react-redux',
        'react-dom': 'react-dom'
    }
};
