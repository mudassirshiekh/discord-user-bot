import { replaceParams } from './../helpers/replaceParams';
import { CampaignContent, CampaignData } from './../../node_modules/mailerlite-api-v2-node/dist/@types/index.d';
import { createLog } from './../helpers/logger';
import MailerLite from "mailerlite-api-v2-node";
import { MailerLiteGroup } from "mailerlite-api-v2-node/dist/api/groups";
import { AssetPathMap } from '../consts/assetPathMap';
import { loadFile, loadFileAsType } from '../helpers/loadFile';
import { ContentParam } from '../helpers/replaceParams';
import { preparePayReminderParams } from '../helpers/payReminderHelpers';

export interface MailingManager {
    sendPayReminderMail: (groupName: string) => void;
    findGroup: (groupName: string) => Promise<MailerLiteGroup>;
} 

interface CreateCampaignResponse {
    campaignType?: string;
    date?:string;
    accountId?: number;
    campaignName?: string;
    id?: number;
    mailId?: number;
    options?: unknown;
}

interface SetCampaignContentResponse {
    success: boolean;
}

export const getMailingManager = (): MailingManager => {
    if (!process.env.MAILERLITE_API_KEY) {
        throw `Not found "MAILERLITE_API_KEY" in your enviroments.`;
    }
    const mailerLite = MailerLite(process.env.MAILERLITE_API_KEY);

    const createCampaign = (data: CampaignData): Promise<CreateCampaignResponse> => {
        return new Promise<CreateCampaignResponse>((resolve, reject) => {
            mailerLite.createCampaign(data)
                .then(response => resolve(response as unknown as CreateCampaignResponse))
                .catch(err => reject(err));
        });
    }; 

    const findGroup = (groupName: string): Promise<MailerLiteGroup> => {
        return new Promise<MailerLiteGroup>((resolve, reject) => {
            mailerLite.getGroups().then(response => {
                const group = response.find(g => g.name === groupName);
                if (group) {
                    resolve(group);
                } else {
                    throw `Not found group "${groupName}" in MailerLite.`;
                }
            }).catch(reson => reject(reson));
        });
    };

    const setCampaignContent = (campaignId: number, content: CampaignContent): Promise<SetCampaignContentResponse> => {
        return new Promise<SetCampaignContentResponse>((resolve, reject) => {
            mailerLite.setCampaignContent(campaignId, content)
                .then(response => resolve(response as unknown as SetCampaignContentResponse))
                .catch(err => reject(err)); 
        });
    };

    const prepareGroupsIds = (groups: MailerLiteGroup[]): number[] => {
        return groups.map(group => group.id);
    };

    const prepareContent = async (htmlFilePath: string, plainTextPath: string, params: ContentParam[]): Promise<CampaignContent> => {
        return {
            html: replaceParams(await loadFile(htmlFilePath), params),
            plain: replaceParams(await loadFile(plainTextPath), params)
        };
    };

    const sendPayReminderMail = async (groupName: string) => {
        let campaignId: number | undefined;
        let isSetContent: boolean = false;
        try {
            const content: CampaignContent = await prepareContent(AssetPathMap.payReminderMailHtml, AssetPathMap.payReminderMailTxt, preparePayReminderParams());
            const campaignData: CampaignData = await loadFileAsType(AssetPathMap.payReminderMailJson);
            const group: MailerLiteGroup = await findGroup(groupName);
            campaignData.groups = prepareGroupsIds([group]);
            const campaignResponse: CreateCampaignResponse = await createCampaign(campaignData);
            campaignId = campaignResponse.id;
            if (campaignId) {
                isSetContent = (await setCampaignContent(campaignId, content)).success;
            }
            if (campaignId && isSetContent) {
                const actResponse = await mailerLite.actOnCampaign(campaignId, "send", {
                    analytics: 1,
                    type: 1
                });
            }
            createLog.info(`Mail was send to group "${groupName}".`)
        } catch (err) {
            createLog.error(err);
            if (campaignId) {
                mailerLite.removeCampaign(campaignId).then(() => {
                    createLog.info(`Removed campaign "${campaignId}".`);
                }).catch(err => {
                    createLog.error(err);
                    createLog.info(`Can't remove campaign "${campaignId}".`);
                });
            }
        }
    };
    
    return {
        sendPayReminderMail,
        findGroup,
    };
};