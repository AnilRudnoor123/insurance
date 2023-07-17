const customerIDsequence=require('../insurancecustomersequence')

const _constant=require('../../utils/constants')

const pad=require('pad')
const generatedementiastagesSequence = function(gssCallback){
    var CustomerIDSequence = new customerIDsequence();
    CustomerIDSequence.save(function(error){
        if(error){
            gssCallback(error, null);
            return;
        }
        else{
            customerIDsequence.findById({"_id": CustomerIDSequence["_id"]}).exec(function(error, incDoc){
              
                if(error){
                    gssCallback(error, null);
                    return;
                }
                else{
                    var customerIDSequenceData = (_constant.CustomerID).concat(pad(3, incDoc["CustomerIDSequence"], "0"));
                    gssCallback(null, customerIDSequenceData)
                
                }
            });
        }
    });
}
exports.generatedementiastagesSequence = generatedementiastagesSequence;

