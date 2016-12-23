var PDFDocument = require('pdfkit');
var fs = require('fs');

doc = new PDFDocument();

doc.pipe(fs.createWriteStream('StatusGram.pdf'));

/*
* StatusGram Watermark
*/

doc.image('./statusgramwatermark.png', 0, 0, { scale: 0.721 });


/*
* Loan Status Ribbon
*
* Closed: http://www.atlanticbay.com/wp-content/uploads/statusgram/Closed-LSM.jpg
* Docs Sent: http://www.atlanticbay.com/wp-content/uploads/statusgram/Documents_Sent-LSM.jpg
* CTC: http://www.atlanticbay.com/wp-content/uploads/statusgram/Clear_To_Close-LSM.jpg
* Cond. Approved: http://www.atlanticbay.com/wp-content/uploads/statusgram/Conditionally_Approved-LSM.jpg
* In Underwriting: http://www.atlanticbay.com/wp-content/uploads/statusgram/Submitted_To_Underwriting-LSM.jpg
* App. Taken: http://www.atlanticbay.com/wp-content/uploads/statusgram/Application_Taken-LSM.jpg
* 
*/

doc.image('./img/closed.jpg', 16, 88, { scale: 0.24066 });


/*
* Loan Number
*
* Fields: FileData.FileName
*
*/

doc.fontSize(7).fillColor('#004990')
  .text('{ Loan Number }', 548, 45, { lineBreak: false });


/*
* Salutaiton Section
*
* Fields: Bor1.NickNameOrFirstName, Bor2.NickNameOrFirstName, ExtendedFields.Status_Gram_Mortgage_Type, SubProp.FullAddress
*
*/

doc.fontSize(12).fillColor('#004990')
  .text('Hi { name }, it\'s our pleasure to finance your purchase with a { mortgage type } Loan.', 43, 132)
doc.text('We can\'t wait until you own { address }!', 43, 147);


/*
* Checkboxes
*
* http://www.atlanticbay.com/wp-content/uploads/statusgram/checkbox-filled-LSM.jpg
*
*/

// Col 1
doc.image('./img/checkbox.jpg', 25, 250, { scale: 0.33 });
doc.image('./img/checkbox.jpg', 25, 273, { scale: 0.33 });
doc.image('./img/checkbox.jpg', 25, 297, { scale: 0.33 });

// Col 2
doc.image('./img/checkbox.jpg', 222, 250, { scale: 0.33 });
doc.image('./img/checkbox.jpg', 222, 273, { scale: 0.33 });
doc.image('./img/checkbox.jpg', 222, 297, { scale: 0.33 });

// Col 3
doc.image('./img/checkbox.jpg', 420, 250, { scale: 0.33 });
doc.image('./img/checkbox.jpg', 420, 273, { scale: 0.33 });
doc.image('./img/checkbox.jpg', 420, 297, { scale: 0.33 });


/*
* Appraisal Notes
*
* Scenario 1: Not null --> Status.AppraisalOrdered, Status.AppraisalReceived, ExtendedFields.AppraisalCleared
*   Text: Status: Great News! The appraisal is complete and has been validated. The appraised value is { appraised value }
*
* Scenario 2: Not null --> Status.AppraisalOrdered, Status.AppraisalReceived
*   Text: Status: For your protection and ours, the u/w is now (or will be shortly) reviewing this report for accuracy and to validate the appraiser's opinion of value.
*
* Scenario 3: Not null --> Status.AppraisalOrdered
*   Text: Status: The appraiser will be contacting the agent or seller to schedule the onsite review of this property.
*
* Scenario 4: null --> Status.AppraisalOrdered
*   Text: Status: We will assign the appraiser to schedule the onsite review of this property as soon as you are ready to move forward.
*
* Other fields: Appraiser.Company
* 
*/

doc.fontSize(8).fillColor('#004990')
  .text('For your protection and ours, the u/w is now (or will be shortly) reviewing this report for accuracy and to validate the appraiser\'s opinion of value.', 25, 206, { width: 174, align: 'left' });
doc.text('{ Appraiser.Company }', 25, 330, { width: 170, align: 'center' });


/*
* HOI Notes
* 
* Scenario 1: Not null --> Status.HazardOrdered, Status.HazardReceived, ExtendedFields.HazardCleared
*   Text: Status: Great News! You're covered.
*
* Scenario 2: Not null --> Status.HazardOrdered, Status.HazardReceived
*   Text: Status: To protect your investment and ours, we are making sure your coverage is sufficient.
*
* Scenario 3: Not null --> Status.HazardOrdered
*   Text: Status: Thank you for providing your choice. We are working with your agent now.
*
* Scenario 4: null --> Status.HazardOrdered
*   Text: Status: TIME SENSITIVE - It's your choice! Don't know? We can help.
*
* Other fields: HazCo.Company, HazCo.FirstAndLastName, HazCo.WorkPhoneFormatted, HazCo.EMail, 
*
*/

doc.fontSize(8).fillColor('#004990')
  .text('To protect your investment and ours, we are making sure your coverage is sufficient.', 222, 206, { width: 174, align: 'left' });
doc.text('{ HazCo.Company }', 222, 330, { width: 170, align: 'center' });
doc.text('{ HazCo.FirstAndLastName }', 265, 367);
doc.text('{ HazCo.WorkPhoneFormatted }', 265, 377);
doc.text('{ HazCo.EMail }', 265, 387);


/*
* Title Notes
* 
* Scenario 1: Not null --> Status.TitleOrdered, Status.TitleReceived, ExtendedFields.TitleClearedDate1
*   Text: Status: Great News! Your closing company and settlement docs are approved.
*
* Scenario 2: Not null --> Status.TitleOrdered, Status.TitleReceived
*   Text: Status: We are currently dotting the I's and crossing the T's for your ownership docs.
*
* Scenario 3: Not null --> Status.TitleOrdered
*   Text: Status: Thank you for making your choice. We are working with your closing company now.
*
* Scenario 4: null --> Status.TitleOrdered
*   Text: Status: It's your choice! Not sure? We have excellent options.
*
* Other fields: SettlementCo.Company, SettlementCo.FirstAndLastName, SettlementCo.WorkPhoneFormatted, SettlementCo.EMail
*
*/

doc.fontSize(8).fillColor('#004990')
  .text('We are currently dotting the I\'s and crossing the T\'s for your ownership docs.', 418, 206, { width: 174, align: 'left' });
doc.text('{ SettlementCo.Company }', 418, 330, { width: 170, align: 'center' });
doc.text('{ SettlementCo.FirstAndLastName }', 460, 367, { lineBreak: false });
doc.text('{ SettlementCo.WorkPhoneFormatted }', 460, 377, { lineBreak: false });
doc.text('{ SettlementCo.EMail }', 460, 387, { lineBreak: false });


/*
* LO Notes
*
* Field: ExtendedFields.Notes_to_Client_on_Statusgram
*
*/

doc.fontSize(8).fillColor('#004990')
  .text('{ ExtendedFields.Notes_to_Client_on_Statusgram }', 25, 439, { width: 370, align: 'left'});


/*
* Property Notes
*
* Fields: SubProp.FullAddress, SubProp.Street, SubProp.CityStateZip, Loan.PurPrice, Purchase.ContractDate, Loan.IntRate, Loan.LockExpirationDate
*
*/

doc.fontSize(8).fillColor('#004990')
  .text('{ SubProp.Street }', 418, 457);
doc.text('{ SubProp.CityStateZip }', 418, 467, { lineBreak: false });
doc.text('{ Loan.PurPrice }', 418, 487);
doc.text('{ ClosingDate }', 500, 487, { lineBreak: false });
doc.text('{ Loan.IntRate }', 418, 527);
doc.text('{ LockExp }', 500, 527, { lineBreak: false });


/*
* LO Info
*
* Fields: LO.FirstName, LO.LastName, LO.ContactNMLSID, LO.WorkPhoneFormatted, LO.EMail, LO.MobilePhoneFormatted, ExtendedFields.Employee_NMLS_Name
*
*/

doc.fontSize(8).fillColor('#004990')
  .text('{ LO.FullName }', 72, 605);
doc.text('NMLS: { LO.ContactNMLSID }', 72, 615);
doc.text('{ LO.WorkPhoneFormatted }', 72, 625);
doc.text('{ LO.EMail }', 72, 635);


/*
* Right Hand Person
*
* Fields: LP.FirstName, LP.LastName, LP.EMail, LP.WorkPhoneFormatted, ExtendedFields.Status_Gram_RH_FullName, ExtendedFields.Status_Gram_RH_Phone,
*         ExtendedFields.Status_Gram_RH_Email, ExtendedFields.Status_Gram_RH_NMLS
*
*/

doc.fontSize(8).fillColor('#004990')
  .text('{ LP.FullName }', 265, 605);
doc.text('NMLS: { LP.ContactNMLSID }', 265, 615);
doc.text('{ LP.WorkPhoneFormatted }', 265, 625);
doc.text('{ LP.EMail }', 265, 635);


/*
* Real Estate Agent
*
* Fields: SelAgent.FirstAndLastName, SelAgent.WorkPhoneFormatted, SelAgent.EMail, SelAgent.Company, SelAgent.MobilePhoneFormatted
*
*/

doc.fontSize(8).fillColor('#004990')
  .text('{ SelAgent.FullName }', 458, 605);
doc.text('{ SelAgent.Company }', 458, 615);
doc.text('{ SelAgent.WorkPhoneFormatted }', 458, 625, { lineBreak: false });
doc.text('{ SelAgent.EMail }', 458, 635);


/*
* Footer
*
* Fields: UserInfo.Name, UserInfo.PhoneFormatted, UserInfo.NMLSCompanyID
*
*/

doc.fontSize(10).fillColor('#004990')
  .text('{ UserInfo.Name }', 269, 725, { lineBreak: false });
doc.text('Phone: (555)-555-5555', 255, 739, { lineBreak: false });
doc.text('NMLS# 000000', 272, 753, { lineBreak: false });

doc.save();

doc.end();