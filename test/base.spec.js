import { describe, expect, it } from 'vitest'

import { mount } from "@vue/test-utils";
import TVTable from "../src/components/TVTable.vue"

describe("Base Test", async() => {

    it("should render with no field set text", () => {
        
        const wrapper = mount(TVTable);

        expect(wrapper.find('.tv-td').text()).toBe('No fields set')
    });
    
    it("should render with no data to display", () => {
        
        const wrapper = mount(TVTable, {
            props: {
                fields: [
                    {
                        label: 'id',
                        key: 'id',
                    },
                ]
            }
        });

        expect(wrapper.find('.tv-td').text()).toBe('No data to display')
    });

    it("should render with some data", () => {
        
        const wrapper = mount(TVTable, {
            props: {
                items: [
                    {
                        id: 1
                    },
                ],
                fields: [
                    {
                        label: 'id',
                        key: 'id',
                    },
                ]
            }
        });

        expect(wrapper.find('.tv-th').text()).toBe('id')
        expect(wrapper.find('.tv-td').text()).toBe('1')
    });

});