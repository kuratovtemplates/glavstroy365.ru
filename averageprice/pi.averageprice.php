<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Memberlist Class
 *
 * @package     ExpressionEngine
 * @category        Plugin
 * @author      Jane Doe
 * @copyright       Copyright (c) 2010, Jane Doe
 * @link        http://example.com/memberlist/
 */

$plugin_info = array(
    'pi_name'         => 'Average Price for Project',
    'pi_version'      => '1.0',
    'pi_author'       => 'Konstantin Cherniak',
    'pi_author_url'   => 'http://galvstroy365.ru/',
    'pi_description'  => 'Average Price for Project',
    'pi_usage'        => Averageprice::usage()
);

class Averageprice
{

    public $return_data = "";

    private function countAvarage($projectId)
    {
        $sumPrice = 0;
        $avgPrice = 0;
        $minPrice = 0;

        $query = ee()->db->select('field_id_45 AS pricepr, MIN(field_id_45) AS pricemin')
        ->from('channel_data')
        ->join('channel_titles', 'channel_data.entry_id = channel_titles.entry_id')
        ->where(array(
            'channel_titles.channel_id' => 4,
            'channel_data.field_id_47' => $projectId,
            'channel_titles.status' => 'open'
        ))
        ->order_by('channel_titles.entry_date', 'desc')
        ->get();

         if ($query->num_rows() > 0 )
        {
            
            foreach($query->result_array() as $row)
            {
                $sumPrice += $row['pricepr'];
                if ( isset($row['pricemin']) ) {
                    $minPrice = $row['pricemin'];                    
                }
            }


            $avgPrice = round($sumPrice/$query->num_rows());
        } 
        else 
        {
        }


        ee()->db->update(
            'channel_data',
            array(
                'channel_data.field_id_125'  => $avgPrice,
                'channel_data.field_id_128'  => $minPrice
            ),
            array(
                'channel_data.entry_id' => $projectId
            )
        );


        return true;

    }

    // --------------------------------------------------------------------

    /**
     * Averageprice
     *
     * This function returns a list of members
     *
     * @access  public
     * @return  string
     */
    public function __construct()
    {
        
        $projectId = ee()->TMPL->fetch_param('projectid');
        $updateAll = ee()->TMPL->fetch_param('updateAll');
        $lastPage = ee()->session->tracker['1'];
        $idAvgPriceField = 125;
        /*project 47, price 45*/

        $count =0;


            $this->countAvarage($projectId);
        if ($lastPage == "users/projects_list") {
        }

        if ($updateAll) {

            /**/
            $query = ee()->db->select('channel_titles.entry_id AS entryidpr')
            ->from('channel_titles')
            ->where(array(
                'channel_titles.channel_id' => 2,
                'channel_titles.status' => 'open'
            ))
            ->order_by('channel_titles.entry_date', 'desc')
            ->get();
             if ($query->num_rows() > 0 )
            {
                
                foreach($query->result_array() as $row)
                {
                    $this->countAvarage($row['entryidpr']);
                    $count++;
                    //echo "<br>".$projectId;
                }
            } 
            else 
            {
            }

            $this->return_data = $count;

        }


       

        /*
        $query = ee()->db->select('field_id_47 AS idpr')
        ->from('channel_data')
        ->join('channel_titles', 'channel_data.entry_id = channel_titles.entry_id')
        ->where(array(
            'channel_titles.author_id' => $userid,
            'channel_titles.channel_id' => 4,
            'channel_titles.status' => 'open'
        ))
        ->order_by('channel_titles.entry_date', 'desc')
        ->get();


       
        if ($query->num_rows() > 0 )
        {
            
            foreach($query->result_array() as $row)
            {
                $this->return_data .= $row['idpr']."|";
            }

        } 
        else 
        {
            $this->return_data .= "0";
        }

  
        $group_id = "6";
        $group_id = ee()->TMPL->fetch_param('group_id');
        $query = ee()->db->select('email')
            ->where('group_id =', $group_id)
            ->get('members', 1000);
        $count=1;
        foreach($query->result_array() as $row)
        {
            $this->return_data .= $row['email'];
            if ( $count < $query->num_rows() ){
            $this->return_data .= ",";
            }
            $count++;
        }
        */
    }


    

    // --------------------------------------------------------------------

    /**
     * Usage
     *
     * This function describes how the plugin is used.
     *
     * @access  public
     * @return  string
     */
    public static function usage()
    {
        ob_start();  ?>

Averageprice

    {exp:averageprice projectid='123123123'}

This is an incredibly simple Plugin.
Parametrs: <br>
userid User ID<br>


    <?php
        $buffer = ob_get_contents();
        ob_end_clean();

        return $buffer;
    }
    // END
}
/* End of file pi.memberlist.php */
/* Location: ./system/expressionengine/third_party/memberlist/pi.memberlist.php */