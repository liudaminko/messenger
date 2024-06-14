package com.messenger.back.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.messenger.back.properties.AwsS3Properties;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class AwsS3Service {
    private final AwsS3Properties s3Properties;
    private AmazonS3 s3Client;

    @PostConstruct
    private void init() {
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(s3Properties.getAccessKey(), s3Properties.getSecretKey());
        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(Regions.US_EAST_1)
                .build();
    }

    /**
     * Uploads image to AWS S3 bucket
     * @param base64 - base64 encoded image
     * @return URL of the uploaded image
     */
    public String uploadImage(String base64) {
        byte[] imageBytes = Base64.getDecoder().decode(base64.split(",")[1]);
        String fileExtension;
        String contentType;
        String bucketName = s3Properties.getBucketName();

        // Determine the file extension and content type based on the base64 string header
        if (base64.startsWith("data:image/png;")) {
            fileExtension = "png";
            contentType = "image/png";
        } else if (base64.startsWith("data:image/jpeg;")) {
            fileExtension = "jpeg";
            contentType = "image/jpeg";
        } else {
            throw new IllegalArgumentException("Unsupported image type");
        }
        String filePathLocation = "images/" + System.currentTimeMillis() + "." + fileExtension;
        try (InputStream inputStream = new ByteArrayInputStream(imageBytes)) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(imageBytes.length);
            metadata.setContentType(contentType);

            s3Client.putObject(new PutObjectRequest(bucketName, filePathLocation, inputStream, metadata));

            return s3Client.getUrl(bucketName, filePathLocation).toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image to S3", e);
        }
    }

}
