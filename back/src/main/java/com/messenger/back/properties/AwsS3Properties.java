package com.messenger.back.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@Data
@ConfigurationProperties(prefix = "aws.s3")
@ConfigurationPropertiesScan
public class AwsS3Properties {
    private String accessKey;
    private String secretKey;
    private String bucketName;
}
