const CONSTANT = {
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_NUMBER_REGEX: /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)(?=.*\d{4,10}$)/
}

const STANDARD_CONTROL_CATEGORIES = {
    REGION: 'Region',
    VPC: 'Vpc',
    SECURITY_GROUP: 'Security_Group',
    SUBNET_NAME: 'Subnet',
    KEY_NAME: 'Key_Name',
    SNS_TOPIC_NAME: 'Sns_Topic',
    INSTANCE_SCHEDULE: 'Instance_Schedule',
    BACKUP: 'Backup_Plan',
    EBS_VOLUME_TYPE: 'EBS_Volume_Type',
    IAM_PROFILE: 'IAM_Profile',
    INSTANCE_TYPE: 'Instance_Type',
    AMI: 'AMI',
    AMI_Hardening: 'AMI_Hardening',
    EC2_TAGS: 'Ec2_Tag',
    AMI_SCRIPTS_FOLDER: 'AMI_Scripts_Folder',
    AMI_SCRIPTS_FILE: 'AMI_Scripts_File',
    AZ: 'AZ',
    AMI_TYPE: 'AMI_Type',
    EC2_INSTANCE: 'Ec2_Instance',
    LOADBALANCER_TYPE: 'LoadBalancer_Type',
    PROTOCOL: 'Protocol'
}

export { CONSTANT, STANDARD_CONTROL_CATEGORIES };